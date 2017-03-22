angular.module("testApp", []).controller("testCTRL", function($scope){

    $scope.items=model.read();
    $scope.currentIdItem=null;
    $scope.comments=model.readComments($scope.currentIdItem);
    $scope.currentIndex=null;
    $scope.flagMain=false;

    $scope.addName=function(){
        if($scope.name!="") {
            model.addItem($scope.name);
            model.save();
            $scope.items=model.read();
            $scope.name="";
        }
    }

    $scope.addComment=function(id, text){
        if (text!="") {
            model.addComment(id, text);
            model.save();
            $scope.comments = model.readComments($scope.currentIdItem);
            $scope.comment="";
        }

    }

    $scope.deleteItem=function(id){
       model.removeItem(id);
       model.save();
       $scope.items=model.read();
        $scope.currentIndex=null;
        angular.element(document.querySelectorAll(".item")).removeClass("active-item");
    }

    $scope.selectItem=function(id, index, event){
        $scope.currentIdItem=id;
        $scope.comments=model.readComments(id);
        $scope.currentIndex=index+1;
        angular.element(document.querySelectorAll(".item")).removeClass("active-item");
        angular.element(event.currentTarget).addClass("active-item");
    }

    $scope.show=function(){
        $scope.flagMain = !$scope.flagMain;
        angular.element(document.querySelector(".aside-item")).toggleClass("active");
    }
});


