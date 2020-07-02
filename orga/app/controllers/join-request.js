import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class JoinRequestController extends Controller {

  @tracked isSubmit = false;
  @tracked isOrganizationNotFound = false;
  @tracked hasOrganizationNoEmail = false;
  @tracked hasErrorMessage = false;

  @action
  async createScoOrganizationInvitation(scoOrganizationInvitation) {
    this.isOrganizationNotFound = false;
    this.hasOrganizationNoEmail = false;
    try {
      await this.store.createRecord('sco-organization-invitation', scoOrganizationInvitation).save();
      this.isSubmit = true;
    } catch (response) {
      if (response.errors && response.errors.length > 0) {
        const status = response.errors[0].status;
        if (status === '404') {
          this.isOrganizationNotFound = true;
        } else if (status === '412') {
          this.hasOrganizationNoEmail = true;
        } else {
          this.hasErrorMessage = true;
        }
      } else {
        this.hasErrorMessage = true;
      }
    }
  }
}
