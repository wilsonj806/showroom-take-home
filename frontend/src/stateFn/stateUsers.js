async function fetchUsersList() {
  this.setState({isMakingRequest: true});
  try {
    const dbCall = await fetch('http://localhost:5000/users');
    console.log(dbCall.json());
  } catch(error) {
    console.log(error);
  }
  this.setState({isMakingRequest: false});
}

export {
  fetchUsersList
}