import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lgcab-philosophy',
  templateUrl: './philosophy.component.html',
  styleUrls: ['./philosophy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhilosophyComponent implements OnInit {
  collage: {
    title: string;
    description: string;
    imageSrc: string;
  }[];

  constructor() {
    this.collage = [
      {
        title: 'LUGN',
        description: `kan se ut på olika sätt. Och ha olika orsaker.

        En lugn vattenyta speglar omvärlden. Minsta lilla pust kan krusa ytan och göra bilden svårtydbar. Blåser det riktigt kraftigt kanske överlevnad är viktigare än att se tydliga mål och hålla rätt riktning.
        
        Överfört i ett projekt är den lugna ytan resultatet av god planering.
        
        Vet man hur nästa steg ser ut och har man planerat och förberett för det, så behöver man inte rusa. Den som är väl planerad och förberedd är ofta den som springer minst.
        
        `,
        imageSrc: 'assets/hand.jpg'
      },
      {
        title: 'ERFARENHET',
        description: `I en komplex värld kan ingen vara stark ensam. Snarare handlar det om att veta vilka specialister man ska kalla till sin hjälp.

        Det ligger i sakens natur att hela vår konkurrenskraft ligger just i detta kontaktnät. Vi har gjort erfarenheterna – du drar fördel av dem.
        `,
        imageSrc: 'assets/hand.jpg'
      },
      {
        title: 'RIKTNING',
        description: `Vet man riktningen är man aldrig vilse.
        För golfaren är flaggan på green sinnebilden för det: Oavsett var din golfboll hamnar behöver du bara lyfta blicken för att veta hur nästa slag måste planeras.
        
        I komplexa projekt är det mer än vind och sneda slag som kan komplicera verkligheten ytterligare. Men har man planerat för en komplicerad verklighet och tydligt satt ut sitt mål är det bara att lyfta blicken för att se vart nästa moment ska riktas.`,
        imageSrc: 'assets/hand.jpg'
      }
    ];
  }

  ngOnInit() {}
}
