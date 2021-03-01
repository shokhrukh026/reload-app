import axios from 'axios';

const baseUrl = 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat'; // change url to your backend api's url for checking updates

export default{
    state:{

    },
    mutations:{
       
    },
    actions: {
        async CHECK_VERSION({commit, getters}, payload){
          return await axios({
            method: "GET",
            url: baseUrl,
            // headers: {Authorization: getters.getUser.token},
            data: payload,
          })
          .then(async (e) => {
            //   Below one line code used for testing purposes.
              e.data = {version: '0.1.1.', updateRequired: true};
              sessionStorage.setItem('versionData', JSON.stringify(e.data));
              return e.data;
          })
          .catch((error) => {
              console.log(error);
              return 'error';
          })
        }
    },
    getters:{

    }
}