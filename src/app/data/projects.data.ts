import { Project } from '../model/project.model';
import { ProjectStatus } from '../model/project-status.model';

const PROJECT_STATUS_MAP = {
  Done: ProjectStatus.DONE,
  Doing: ProjectStatus.DOING
} as const;

const RAW_PROJECTS = [
  {
    "id": "cjpa3trbwggt509458o0ff2ly",
    "title": "Arbetarebostadsfonden",
    "description": "Bygg- och projektledning i samverkan. Förnyelse av kv. Drakdödaren 1 & 3\n",
    "role": "Fastighetsägarombud vid ombyggnad",
    "createdAt": "2018-12-04T18:56:05.28+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3w0xhghe90945t0lm03rh",
    "title": "Brf Hälsingen",
    "description": "Kv Valkyrian. \nStambyte.\n\nFastighetsägaren stod i begrepp att utföra ett stambyte i egen regi, Lennart Gullberg Consulting AB anlitades för att upprätta förfrågningsunderlag, anbudsutvärdering och genomföra upphandling av Totalentreprenör (TE) bygg, anlita kvalitetsansvarig enligt PBL, underätta myndigheter och byggleda renoveringen.\n",
    "role": "Fastighetsägarombud vid renovering",
    "createdAt": "2018-12-04T18:57:51.032+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa43c8qgj5l0945bup3aeul",
    "title": "Brf Hemmet 18",
    "description": "KA uppdrag, bygglovshandläggning, projektledning, planarbete, besiktningar mm\n",
    "role": "Bygg- och projektledning",
    "createdAt": "2018-12-04T19:03:32.288+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa42t2hgj0y0945ozbeef9b",
    "title": "Brf Högsäter",
    "description": "Rådgivning i byggärenden mm.",
    "role": "Bygg- och projektledning",
    "createdAt": "2018-12-04T19:03:07.437+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3yax2ghws0945bt5puhar",
    "title": "Brf Idéhuset",
    "description": "Bostadsrättsförening i kvarteret Harven.\n",
    "role": "Byggherreombud och byggledning",
    "createdAt": "2018-12-04T18:59:37.288+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3x492ghnj0945ftpj2wbc",
    "title": "Centrumutveckling",
    "description": "Centrumutveckling\tFlyttkonsult\n\n",
    "role": "Hyresgästombud flytt av kontor",
    "createdAt": "2018-12-04T18:58:41.994+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3peg1gfqc09459sbmmys4",
    "title": "Einar Matsson Bygg",
    "description": null,
    "role": "Projektinköpare",
    "createdAt": "2018-12-04T18:52:41.957+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3zvndgiao09457u6kh8ir",
    "title": "Ernst & Young",
    "description": "Uppdrag: Hyresgästombud vid omorganisation och förtätning av arbetsplatser.\n\nProjektstart 2001 Projekttid 24 mån.",
    "role": "Hyresgästombud flytt av kontor",
    "createdAt": "2018-12-04T19:00:50.813+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa4266sgivv09452jc8svrf",
    "title": "Fönsterdesign AB",
    "description": "Hyresgästombud vid flytt av butik, lager och kontor.\nHyresförhandling, byggledning mm\n",
    "role": "Hyresgästombud",
    "createdAt": "2018-12-04T19:02:37.782+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa40xfmgikn0945152oht2r",
    "title": "HeadQuarters Annonsbyrå",
    "description": "Efter 24 år var det dags att trappa ner, krympa kostymen genom att flytta till nya, mindre lokaler.\nVi ansvarade för nedpackning och logostik runt flytten.\n\n",
    "role": "Ansvarig för nedpackning och logostik",
    "createdAt": "2018-12-04T19:01:39.782+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3ql2ugg0o0945ibea0z3w",
    "title": "Judiska hemmet",
    "description": "Upprättande av underhållsplan inkluderande utredning och inventering nulägesanalys av fastighetens status och kondition.\n",
    "role": "Bygg- och projektledning vid ombyggnad",
    "createdAt": "2018-12-04T18:53:37.211+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3wni1ghjq0945u2t86fqk",
    "title": "NCC Construction",
    "description": "Projekteringsledning vid nybyggnation av kontorshus i projekt Västerport: nybyggnad av 22 000 m2 kontor.",
    "role": "Projekteringsledning",
    "createdAt": "2018-12-04T18:58:20.286+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3xn99ghre0945623d2qi0",
    "title": "Nilsson & Partners",
    "description": "Butiksombyggnad och flytt.\n\n",
    "role": "Hyresgästombud flytt av kontor",
    "createdAt": "2018-12-04T18:59:06.625+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3s8g8ggel0945jopn02dv",
    "title": "Nilsson & Partners AB",
    "description": "Finansinpektionen, Hyresgästanpassning i nya och befintliga lokaler i en fastighet, vår roll var samordnande projektledare inklusive verka som hyresgästombud",
    "role": "Hyresgästombud vid ombyggnad",
    "createdAt": "2018-12-04T18:54:54.155+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3vcdlgh8c0945ztendydu",
    "title": "Nordstedts Audio",
    "description": "Norstedt Audio Studios (Talande Böcker)\n\nTalande Böcker är ett helägt dotterbolag till Norstedts Förlagsgrupp i och med detta förvärv så skall bolagen samlokaliserasÂ på en gemensam adress. Samtidigt skall lokalerna hyresgästanpassas för denna verksamhet, vilket medför att det skall byggas studios, redigeringsrum,Â pausrum för skådespelare samt kontor för medarbetare.\n\nLennart Gullberg Consulting AB anlitas för att genomföra denna samlokalisering.\n\n",
    "role": "Hyresgästombud flytt av kontor",
    "createdAt": "2018-12-04T18:57:19.213+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3sv6ogglb09453uxjyx1g",
    "title": "Sveanor Fastigheter AB",
    "description": "Blickaberget, Nybyggnad av kontor, lager och tillverkningsindustri för Bactiguard AB.\nVår roll i detta projekt är Kontrollansvarig och byggledare.\n",
    "role": "Fastighetsägarombud vid nybyggnation",
    "createdAt": "2018-12-04T18:55:23.621+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3ue35ggz209450yolaxux",
    "title": "Tele2",
    "description": "Projektleding för mindre kontorsetableringar",
    "role": "Hyresgästombud flytt av kontor",
    "createdAt": "2018-12-04T18:56:34.774+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3uvr6gh340945t9x6h3kx",
    "title": "Tele2 Sverige AB",
    "description": "Förstudier för kontorsetableringar\n\n",
    "role": "Hyresgästombud flytt av kontor",
    "createdAt": "2018-12-04T18:56:57.67+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3y0m1ghue09458c7oq1yl",
    "title": "Tidningen Vi",
    "description": "Flyttkonsult",
    "role": "Hyresgästombud flytt av kontor",
    "createdAt": "2018-12-04T18:59:23.934+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3pxhagfv30945qbzyxnf9",
    "title": "Unibail Rodamco",
    "description": null,
    "role": "Hyresgästkoordinator",
    "createdAt": "2018-12-04T18:53:06.627+00:00",
    "currentStatus": "Done"
  },
  {
    "id": "cjpa3p08ogfn40945tu874ng0",
    "title": "Victor Hanson Bygg",
    "description": null,
    "role": "Projekteringsledning",
    "createdAt": "2018-12-04T18:52:23.548+00:00",
    "currentStatus": "Done"
  }
] as const;

export const PROJECTS: Project[] = RAW_PROJECTS.map(project => ({
  ...project,
  currentStatus: PROJECT_STATUS_MAP[project.currentStatus]
}));
