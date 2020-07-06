const _ = require('lodash');

const { MissingQueryParamError } = require('../http-errors');
const usecases = require('../../domain/usecases');
const organizationInvitationSerializer = require('../../infrastructure/serializers/jsonapi/organization-invitation-serializer');

module.exports = {

  async acceptOrganizationInvitation(request) {
    const organizationInvitationId = request.params.id;
    const { code, email } = request.payload.data.attributes;

    await usecases.answerToOrganizationInvitation({ organizationInvitationId, code, email });
    return null;
  },

  async getOrganizationInvitation(request) {
    const organizationInvitationId = request.params.id;
    const organizationInvitationCode = request.query.code;

    if (_.isEmpty(organizationInvitationCode)) {
      throw new MissingQueryParamError('code');
    }

    const organizationInvitation = await usecases.getOrganizationInvitation({ organizationInvitationId, organizationInvitationCode });
    return organizationInvitationSerializer.serialize(organizationInvitation);
  },
};
