export default  async (context) => {
    const { redirect, $auth } = context;
    const token = await $auth.strategy.token.get();
    if(!token){
        $auth.logout();
        return redirect('/unirse/login')
    } 
    const b64Encoded = token.split(' ')[1].split('.')[1];    ;
    const data = JSON.parse( Buffer.from(b64Encoded, 'base64').toString());    
    
    const isUserRole = data.user.role === 'USER_ROLE'
    
    if( !isUserRole ){
        return redirect('/unirse/login')
    }
}

