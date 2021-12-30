<?php
    namespace Controllers;

    class CartController extends MovieController{
        private $cart;
        function __construct(array $page){
            parent:: __construct($page);
            $this->cart = array();
            $this->expireDate = time() + (3600 * 24);
        }
        public function setCart():void{
            $cart = json_decode($_COOKIE['panier']);
            $this->cart = $cart;

        }
        public function resetCart(array $cart):void{
            setcookie("panier",json_encode($cart),$this->expireDate,"/");
        }
        public function addToCart(string $id):void{
            array_push($this->cart,$id);
            setcookie("panier",json_encode($this->cart),$this->expireDate,"/");
        }
        public function getcookie($cookieName){
            
            return $cookie = isset($_COOKIE[$cookieName]) ? $_COOKIE[$cookieName] : false;
        }
        public function getCart():array{
            $this->setCart();
            $cart = [];
            $newCart = [];
            $idRef = [];
            // var_dump($this->cart);

            foreach($this->cart as $id){
                
                    $movie = $this->pullOneMovie($id);
                    $newCart['id'] = $id;
                    $newCart['title'] = $movie['title'];
                    $newCart['price'] = $movie['price'];
                    $newCart['image'] = $movie['image'];
                    $newCart['quantity'] = 1;

                if(!in_array($id,$idRef)){
                    array_push($cart,$newCart);
                    array_push($idRef,$id);
                   
                }else{
                    
                    $index = array_search($newCart,$cart);
                    $cart[$index]['quantity'] += 1;
                    $cart[$index]['price'] +=  $newCart['price'];
                }
            }   
            return $cart;
        }
        
        public function removeOneArticle(string $id):array{
            $newCart = [];
            $this->setCart();
            $cart = $this->cart;
            $indexArticle = array_search($id,$cart);
            // var_dump($cart);
            unset($cart[$indexArticle]);
            foreach($cart as $article){
                $newCart[] = $article;
            }
            // var_dump($newCart);
            $this->resetCart($newCart);
            return $newCart;
        }
        public function removeAllArticles(){
            $cart = [];
            $this->resetCart($cart);
        }

    }