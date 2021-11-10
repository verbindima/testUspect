import adminService from '../services/adminService.js'

class adminController {
  async getAdminData(req, res) {
    try {
      const dataPagination = req.params
      console.log(dataPagination)
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'error admin-data' })
    }
  }
}

export default new adminController()
