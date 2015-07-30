/**
 * Created by jeanlucasdecarvalhosilva on 30/07/15.
 */
class ProfileController {
  constructor (Restangular, Session) {

    var usuario = Restangular.one('usuarios', Session.user.id);

    usuario
      .get()
      .then((res) => {
        this.usuario = res.data;
      });
  }
}

ProfileController.$inject = ['Restangular', 'Session'];

export default ProfileController;
