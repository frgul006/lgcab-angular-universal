import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Contact } from '../../model/contact.model';

@Component({
    selector: 'lgcab-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ContactComponent {
  @Input() contact: Contact | null = null;
}
