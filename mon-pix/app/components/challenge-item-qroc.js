import { action } from '@ember/object';
import ChallengeItemGeneric from './challenge-item-generic';
import classic from 'ember-classic-decorator';

@classic
class ChallengeItemQroc extends ChallengeItemGeneric {

  autoReplyAnswer = '';
  postMessageHandler = null;

  _hasError() {
    return this._getAnswerValue().length < 1;
  }

  _getAnswerValue() {
    return this.showProposal ? (document.querySelector('[data-uid="qroc-proposal-uid"]')).value : this.autoReplyAnswer;
  }

  _getErrorMessage() {
    return 'Jouer l\'épreuve pour valider. Sinon, passer.';
  }

  get showProposal() {
    return !this.challenge.autoReply;
  }

  @action
  answerChanged() {
    this.set('errorMessage', null);
  }

  didInsertElement() {
    if (this.challenge.autoReply) {
      this.addEventListener();
    }
  }

  didDestroyElement() {
    if (this.challenge.autoReply) {
      window.removeEventListener('message', this.postMessageHandler);
    }
  }

  addEventListener() {
    this.postMessageHandler = this.receiveEmbedMessage.bind(this);
    window.addEventListener('message', this.postMessageHandler);
  }

  receiveEmbedMessage(event) {
    if (typeof event.data === 'string') {
      this.autoReplyAnswer = event.data;
    }
  }

}

export default ChallengeItemQroc;
