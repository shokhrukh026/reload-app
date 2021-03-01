import axios from 'axios';

const baseUrl = 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat';

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
            data: {
                version: payload,
            }
          })
          .then(async (e) => {
              e.data = {latestVersion: '0.1.1.', updateRequired: true};
              sessionStorage.setItem('version', JSON.stringify(e.data));
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