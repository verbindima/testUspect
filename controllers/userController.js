class userController {

    async register(req,res) {
        try {
            
            return res.json({message: "Пользователь успешно зарегистрирован"});
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'registration Error'}) 
        }
    }
    
    async login(req,res) {
        try {
            const {login, password} = req.body
        } catch (e) {
           
            res.status(400).json({message: 'login Error'})
        }
    }
    async logout(req,res) {
        try {



        } catch(e) {
            res.status(400).json({message: 'logout Error'})
        }
    }
    
    async getUser(req,res) {
        try {
            
            
        } catch (e) {
             
             res.status(400).json({message: 'User Error'})
        }
    }
}
export default new userController();