  //Login Api Func
  const baseURL = 'https://test.nadvertex.com/allemni/api';
  const verifyLogin = () => {

      try {
          setloaded(true)

          let url = baseURL + '/student-login';
          let req = new Request(url, {
              method: 'Post',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email: email,
                  password: password,
              })
          });
          fetch(req)
              .then(response => response.json())
              .then(showData)
              .catch(badStuff)

      } catch (e) { console.log(e) }

  }
  const showData = (data) => {
      setloaded(false)
      console.log('Data = '+JSON.stringify(data))
      navigation.navigate('MenuScreen')
      
  }
  const badStuff = (err) => {
      setloaded(false)
      // console.log(JSON.stringify(err))
      alert('InCorrect username or password.')
  }