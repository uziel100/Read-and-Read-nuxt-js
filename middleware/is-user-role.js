export default  async (context) => {
    const { redirect, $auth } = context;

    const token = await $auth.strategy.token.get()
    console.log(token )
    const data = decodeUser( token );
    console.log(data)
    const isUserRole = data.user.role === 'USER_ROLE'
    
    if( !isUserRole ){
        return redirect('/unirse/login')
    }
}

const decodeUser = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
};