import { isPlatformBrowser } from '@angular/common';
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserTransferStateModule, makeStateKey, TransferState } from '@angular/platform-browser';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkHandler, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

const uri = 'https://api-euwest.graphcms.com/v1/cjpa3dpw90mgv01exr2iiru13/master';
const STATE_KEY = makeStateKey<any>('apollo.state');

@NgModule({
  exports: [ApolloModule, HttpLinkModule, BrowserTransferStateModule]
})
export class GraphQLModule {
  cache: InMemoryCache;
  link: HttpLinkHandler;

  constructor(
    private readonly apollo: Apollo,
    private readonly transferState: TransferState,
    private readonly httpLink: HttpLink,
    @Inject(PLATFORM_ID) readonly platformId: Object
  ) {
    // tells if it's browser or server
    const isBrowser = isPlatformBrowser(platformId);

    this.cache = new InMemoryCache();
    this.link = this.httpLink.create({ uri });

    const authLink = setContext((_, { headers }) => {
      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJ0b2tlbklkIjoiNTE5OGVkNzUtZTI5MS00NTY3LTk3YjQtZmI4NTYxYzUyM2I5In0.eyMKRxKJlWblcGYImZ7Hug-yEMBeeDdgDY1Mg0duGck';
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ''
        }
      };
    });

    this.apollo.create({
      link: authLink.concat(this.link),
      cache: this.cache,
      ...(isBrowser
        ? {
            // queries with `forceFetch` enabled will be delayed
            ssrForceFetchDelay: 200
          }
        : {
            // avoid to run twice queries with `forceFetch` enabled
            ssrMode: true
          })
    });

    if (isBrowser) {
      this.onBrowser();
    } else {
      this.onServer();
    }
  }

  onServer() {
    // serializes the cache and puts it under a key
    this.transferState.onSerialize(STATE_KEY, () => this.cache.extract());
  }

  onBrowser() {
    // reads the serialized cache
    const state = this.transferState.get<NormalizedCacheObject>(STATE_KEY, null);
    // and puts it in the Apollo
    this.cache.restore(state);
  }
}
