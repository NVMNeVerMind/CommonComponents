import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Pages} from "../../app-routing.module";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
   readonly links = [
    {
      link: '/' + Pages.createExam,
      src: 'assets/exam.svg',
      alt: 'create exam',
      text: 'créer un examen'
    },
    {
      link: '/' + Pages.setSession,
      src: 'assets/add-session.svg',
      alt: 'new session',
      text: 'nouvelle session'
    },
    {
      link: '/e',
      src: 'assets/session.svg',
      alt: 'currents sessions',
      text: 'sessions en cours'
    },
    {
      link: '/' + Pages.examList,
      src: 'assets/list.svg',
      alt: 'exam list',
      text: 'liste des examens'
    },
    {
      link: '/' + Pages.examCorrectionByStudent,
      src: 'assets/mark.svg',
      alt: 'correct exam',
      text: 'corriger un examen'
    },
     {
       link: ['/' + Pages.sessionDetail, 'abcdef'],
       src: 'assets/mark.svg',
       alt: 'étail d\'une session',
       text: 'Détail d\'une session'
     },
     {
       link: '/' + Pages.sessionList,
       src: 'assets/exam.svg',
       alt: 'session list',
       text: 'List des sessions'
     },
  ]
}
