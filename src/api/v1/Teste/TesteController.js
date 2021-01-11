import { resolve } from 'path';
import db from '../../../database/FirebirdConnection';

class TesteController {
  async index(req, res) {
    const query = db.readSQL(resolve(__dirname, 'teste.sql'));
    const data = await db.exec(query);
    return res.status(200).json(data);
  }

  async find(req, res) {
    return res.status(200).json('getById');
  }

  async store(req, res) {
    return res.status(200).json('post');
  }

  async update(req, res) {
    return res.status(200).json('update');
  }

  async delete(req, res) {
    return res.status(200).json('delete');
  }
}

export default new TesteController();
