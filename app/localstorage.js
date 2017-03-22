var model = (function () {

    var _data = [];
    var _comments = [];

    function _addItem(name) {
        _data.push({
            id: getCurrentId(),
            name: name,
            comments: []
        });
    }

    function _addComment(id,text){
        _data.forEach(function (e, index) {
            if (e.id == id) {
                _data[index].comments.push(text);
            }
        })
    }

    function _removeItem(id) {
        _data.forEach(function (e, index) {
            if (e.id == id) {
                _data.splice(index, 1);
            }
        })
    }

    function _save() {
        window.localStorage["items"] = JSON.stringify(_data, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val;
        });
    }

    function _read() {
        var temp = window.localStorage["items"];

        if (!temp) _data = [];
        else _data = JSON.parse(temp);

        return _data;
    }

    function _readComments(id){
        _comments=[];
        if(id==null) return _comments;
        var temp=_read();
            temp.forEach(function (e, index) {
                if (e.id == id) {
                    for (let i = 0; i < temp[index].comments.length; i++) {
                        _comments.push(temp[index].comments[i]);
                    }
                }
            });
        return _comments;
    }

    function getCurrentId() {
        if (!_data || _data.length == 0) return 0;
        else return _data[_data.length-1].id+1;
    }

    return {
        data: _data,
        addItem: _addItem,
        addComment: _addComment,
        removeItem: _removeItem,
        save: _save,
        read: _read,
        readComments: _readComments
    };

})();
