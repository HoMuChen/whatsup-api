var whatsupWeb = (function() {
  var API_URL = 'https://whatsup.homuchen.me';
  var _applicationId = '';
  var _swRegistration = null;

  function init({ applicationId, swRegistration }) {
    _applicationId = applicationId;
    _swRegistration = swRegistration;
  }

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function getPublicKey() {
    return axios({
      method: 'get',
      url: `${API_URL}/api/applications/${_applicationId}`
    })
  }

  function saveSubscription(subscription) {
    return axios({
      method: 'post',
      url: `${API_HOST}/api/subscriptions`,
      headers: {
        'Content-type': 'application/json',
      },
      data: {
        application_id: _applicationId,
        subscription: subscription,
      }
    })
  }

  function subscribe() {
    return getPublicKey()
      .then(_ => _.data && _.data.publicKey)
      .then(publicKey => _swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(publicKey),
      }))
      .then(saveSubscription)
  }

  function getSubscription() {
    return _swRegistration.pushManager.getSubscription();
  }

  function unsubscribe() {    
    return _swRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        if(subscription) {
          return subscription.unsubscribe();
        }
      })
  }

  function isSubscribed() {
    return _swRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        return subscription === null
          ? false
          : true
      })
  }

  return {
    init,
    subscribe,
    getSubscription,
    unsubscribe,
    isSubscribed,
  }
})()
