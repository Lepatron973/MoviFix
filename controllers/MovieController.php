<?php
    namespace Controllers;

    class MovieController extends Controller{
        function addMovies(array $movies):void{
            $this->insert($movies);
        }
        function pullAllMovies(){
            $table = "movies";
            $datas = $this->model->getAllMovies($table);
            return $datas;
        }
        function pullOneMovie(string $id):array{
            $table = "movies";
            $datas = $this->model->getOneMovie($id);
            return $datas;
        }
        function pullMoviesId():array{
           
            return $this->model->getMoviesId();
        }
        function modifyMovie():void{
           
            $datas = $this->model->updateMovie();
    
        }
        function newMovie(array $movie = []):void{
            $data = $movie;
            $this->model->addMovie($data);
        }
    }
    