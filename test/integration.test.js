import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import httpMocks from 'node-mocks-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('CRUD functionality', () => {
  describe('ADD SONG', () => {
    it('It should add a song to our database', done => {});
    it('It should throw error if the required song properties are missing or malformatted', done => {});
  });
  describe('GET ALL SONGS', () => {
    it('It should get all the songs from the database', done => {});
  });
  describe('UPDATE SONG', () => {
    it('It should successfully update the song with the given ID', done => {});
    it('It should throw error if the ID of the song doesnt exist', done => {});
    it('It should throw error if the body which must be updated malformatted', done => {});
  });
  describe('GET A SINGLE SONG', () => {
    it('It should give back information about a single song', done => {});
    it('It should give back not found, if the song is not found by ID', done => {});
  });
  describe('DELETE SONG', () => {
    it('It should successfully delete a single song with an ID', done => {});
    it('It should give back not found, if the song ID does not exists', done => {});
  });
});
