import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {HttpErrorInterceptor} from "../../utils/http-error.interceptor";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {marked} from "marked";

@Component({
    selector: 'app-changelog',
    templateUrl: './changelog.component.html',
    standalone: false,
})
export class ChangelogComponent implements OnInit {
    protected displayChangelog = false;
    protected content: SafeHtml | undefined;

    constructor(
        protected readonly authService: AuthService,
        protected readonly errorInterceptor: HttpErrorInterceptor,
        private sanitizer: DomSanitizer
    ) {
    }

    async ngOnInit() {
        await this.markdownToHtml().then(content => {
            this.content = this.sanitizer.bypassSecurityTrustHtml(content)
        })
    }

    showNotification() {
        return !this.authService.getReadChangelog();
    }

    showChangelog() {
        this.displayChangelog = true;
        this.updateReadChangelog();
    }

    closePanel() {
        this.displayChangelog = false;
    }

    updateReadChangelog() {
        this.authService.setChangelogRead().subscribe({
            error: err => {
                this.errorInterceptor.interceptError(err)
            }
        })
    }

    async markdownToHtml() {
        return await fetch('/assets/CHANGELOG.md')
            .then(res => res.text())
            .then(async text => await marked(text));
    }
}
