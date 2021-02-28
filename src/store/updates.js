import axios from 'axios';

const baseUrl = 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat';

export default{
    state:{

    },
    mutations:{
       
    },
    actions: {
        async CHECK_VERSION(){
          return await axios({
            method: "GET",
            url: baseUrl,
          })
          .then(async (e) => {
              // console.log(e.data);
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
