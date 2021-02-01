import { isPlatformBrowser } from '@angular/common';
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserTransferStateModule, makeStateKey, TransferState } from '@angular/platform-browser';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkHandler, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

const uri = 'https://api-eu-central-1.graphcms.com/v2/cjpa3dpw90mgv01exr2iiru13/master';
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
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MTIxNjgyMDMsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NqcGEzZHB3OTBtZ3YwMWV4cjJpaXJ1MTMvbWFzdGVyIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYzEwM2NmNGMtMDNiNy00YTY2LTg0MmUtYmFhYzYyNjAzNWRkIiwianRpIjoiY2trbWJibmRob3d5NzAxeHM2aWduNXZnMiJ9.q2CPd9_gZDLZyTmUqBNJ2y0veKiIuEjmMTJ9cx7KqOmSW5VtLYUMyyNHCJHzlmXbeJrobXfrt_OYLUByHJcoG3Nf1NxWyYWgiVUsckHQ37PcvW63X_T91VKGtIgLqqPVZbocIFCT1f43gcrz5cRBOeF5mUlSqb_rbGayep3z7Z6zu-355jW4-g5XxykoY-SbsIMxBjCkb-5PZZQwNLJsytNutbxdByhHmjPdmZf1mxkHTlhn-_R2B3jaV7GcXIH-9Py4IyGFB8yVdiXnOmJ6ST8GptkvhRNh0Y2Kd2BpV5-LNohttc6IwDkfzX8d1dHzw5bgKs-FKQUSqIa0cQT3r-Rskzu4Sr5_CJEAj4n3Y7zLTMnJupxtIL4i-MakN5tH_Z2fE4z_6L5ojPIdWQFk_hZm5lzETncmkNjB6aS5mo-Pt82UPSeQg--V5oPxnkyEchu4N4IwN0ftBmhYhzFUT4jehBCqHDdkdNn5IJe0C_5iFd0TR_5kIyf5fEgZfZP1eulPNOC60TtiQWEygZy99O0He2B9osFfCpfLC6ibuLyHaJKuilptBAUnvWNRRBoaTMLVCU0e3j02rS3uqkXCGy1mnC3eUzPURMc6cxkRu9UREsK5YW-lRF0PkJlniiGE5TTO4KbSz9S3wpkKag5Hv7zmEUopVYp2BGbwtFIOUJ8';
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
