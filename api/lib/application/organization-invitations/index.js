const organizationInvitationController = require('./organization-invitation-controller');

exports.register = async (server) => {
  server.route([
    {
      method: 'POST',
      path: '/api/organization-invitations/{id}/response',
      config: {
        auth: false,
        handler: organizationInvitationController.acceptOrganizationInvitation,
        notes: [
          '- Cette route permet d\'accepter l\'invitation à rejoindre une organisation, via un **code** et un **email**'
        ],
        tags: ['api', 'invitations']
      }
    },
    {
      method: 'GET',
      path: '/api/organization-invitations/{id}',
      config: {
        auth: false,
        handler: organizationInvitationController.getOrganizationInvitation,
        notes: [
          '- Cette route permet de récupérer les détails d\'une invitation selon un **id d\'invitation** et un **code**\n',
        ],
        tags: ['api', 'invitations']
      }
    },

  ]);
};

exports.name = 'organization-invitation-api';
