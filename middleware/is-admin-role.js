export default  async (context) => {
    const { redirect, $auth } = context;
    const token = await $auth.strategy.token.get();
    if(!token){
        $auth.logout();
        return redirect('/unirse/login')
    }
    const b64Encoded = token.split(' ')[1].split('.')[1];    ;
    const data = JSON.parse( Buffer.from(b64Encoded, 'base64').toString());    
    
    const isAdminRole = data.user.role === 'ADMIN_ROLE'
    
    if( !isAdminRole ){
        return redirect('/')
    }
}