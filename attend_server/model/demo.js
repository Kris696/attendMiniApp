module.exports = (req, res) => {
    // 过滤数组数据
    /* let ids = [1, 2, 3];
    let arr = [1, 2, 3, 4];
    let newArray = [];
    arr.forEach(item => { //遍历arr
        //此处如果需要留下重复元素,则将!去掉即可
        //arr中的元素如果在ids中不存在,则添加到新数组中
        if (!ids.includes(item)) {
            newArray.push(item);
        };
    })
    console.log(newArray); //结果为: [4] */

    let arrParticipantList = [{
        userId: 0,
        age: 10
    }, {
        userId: 1,
        age: 15
    }, {
        userId: 2,
        age: 20
    }];

    let _participantList = [{
        userId: 2,
        age: 20
    }];

    let ips = arrParticipantList.map((item) => {
        item.userId
    });

    let _filterList = _participantList.map((item) => {
        if (!ips.includes(item.userId)) {
            //重置已经选中的新添加人员
            if (this.isReset) {
                item.checked = false;
                return item
            }
            return item
        }
    });

    let newArr = [...arrParticipantList, ..._filterList]

    res.send(newArr);


};