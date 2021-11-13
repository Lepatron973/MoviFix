<?php
    namespace Controllers;

    class MovieController extends Controller{
        function addMovies(array $movies){
            $this->insert($movies);
        }
        function pullAllMovies(){
            $table = "movies";
            $datas = $this->model->getAllMovies($table);
            return $datas;
        }
        function pullOneMovie($id){
            $table = "movies";
            $datas = $this->model->getOneMovie($id);
            return $datas;
        }
        function pullMoviesId(){
           
            return $this->model->getMoviesId();
        }
        function modifyMovie(){
           
            $datas = $this->model->updateMovie();
    
        }
        function newMovie($movie = []){
            $data = $movie;
            return $this->model->addMovie($data);
        }
    }
    