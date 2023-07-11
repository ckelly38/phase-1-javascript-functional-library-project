function myKeys(obj)
{
    let myproperties = Object.getOwnPropertyNames(obj);
    let mykyslist = new Array();
    //console.log("myproperties = " + myproperties);
    //console.log("myproperties.length = " + myproperties.length);
    for (let n = 0; n < myproperties.length; n++)
    {
        //console.log("myproperties[" + n + "] = " + myproperties[n]);
        //console.log("isenumerable: " + obj.propertyIsEnumerable(myproperties[n]));
        if (obj.propertyIsEnumerable(myproperties[n])) mykyslist.push(myproperties[n]);
        //else;//do nothing
    }
    return mykyslist;
}
//console.log("myKeys({one: 1, two: 2, three: 3}) = " + myKeys({one: 1, two: 2, three: 3}));

function myValues(obj)
{
    let objkys = myKeys(obj);
    let myvals = new Array();
    for (let n = 0; n < objkys.length; n++)
    {
        //console.log("objkys[" + n + "] = " + objkys[n]);
        //console.log("myval = obj[objkys[" + n + "]] = " + obj[objkys[n]]);
        myvals.push(obj[objkys[n]]);
    }
    return myvals;
}

function myKeysFilter(obj)
{
    return myFilter(Object.getOwnPropertyNames(obj),
        function(item){return (obj.propertyIsEnumerable(item)); });
}
function myValuesMap(obj)
{
    return myMap(myKeys(obj), function(item){return obj[item];});
}
//console.log("myKeysFilter({one: 1, two: 2, three: 3}) = " + myKeysFilter({one: 1, two: 2, three: 3}));
//console.log("myValues({one: 1, two: 2, three: 3}) = " + myValues({one: 1, two: 2, three: 3}));
//console.log("myValuesMap({one: 1, two: 2, three: 3}) = " + myValuesMap({one: 1, two: 2, three: 3}));

function myEach(collection, cb)
{
    if (Array.isArray(collection))
    {
        for (let n = 0; n < mySize(collection); n++) cb(collection[n]);
        return collection;
    }
    else
    {
        let mychvals = myEach(myValues(collection), cb);
        return collection;
    }
}
//myEach([1, 2, 3], alert);
//myEach({one: 1, two: 2, three: 3}, alert);//call fails for the moment

function printOneDArray(arr, arrname = "arr")
{
    if (arr == undefined || arr == null) console.log("" + arrname + " is empty!");
    else
    {
        console.log("" + arrname + " has " + arr.length +
            ((arr.length == 1) ? " item " : " items ") + "on it!");
        for (let n = 0; n < arr.length; n++) console.log("" + arrname + "[" + n + "] = " + arr[n]);
    }
}

function myMap(collection, cb)
{
    if (Array.isArray(collection))
    {
        let mynwarr = new Array();
        for (let n = 0; n < mySize(collection); n++)
        {
            mynwarr.push(cb(collection[n], null));
        }
        return mynwarr;
    }
    else return myMap(myValues(collection), cb);
}
//let mymaparr = myMap([1, 2, 3], function(num){ return (num * 3); });
//printOneDArray(mymaparr, "mymaparr");
//let mymapobjarr = myMap({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
//printOneDArray(mymapobjarr, "mymapobjarr");//call fails for the moment

function myReduce(collection, cb, acc = 0)
{
    if (Array.isArray(collection))
    {
        let nsi = 0;
        if (acc == 0)
        {
            acc = collection[0];
            nsi = 1;
        }
        //else;//do nothing
        for (let n = nsi; n < mySize(collection); n++)
        {
            acc += cb(0, collection[n], collection);
        }
        return acc;
    }
    else return myReduce(myValues(collection), cb, acc);
}
//let myrednum = myReduce([1, 2, 3], function(acc, val, collection) {return (val + acc); }, 10);
//console.log("myrednum = " + myrednum);//should be 16
//let myobjrednum = myReduce({one: 1, two: 2, three: 3},
//    function(acc, val, collection) { return acc + val; });
//console.log("myobjrednum = " + myobjrednum);//call fails for the moment

function mySize(collection)
{
    if (Array.isArray(collection)) return collection.length;
    else return mySize(myValues(collection));
}
//let mysizearrnum = mySize([1, 2, 3]);
//console.log("mysizearrnum = " + mysizearrnum);
//let mysizeobjnum = mySize({one: 1, two: 2, three: 3});
//console.log("mysizeobjnum = " + mysizeobjnum);//call fails for the moment

//in general having two different return types is bad practice
function myFirst(array, n = 0)
{
    if (n > 0) return array.slice(0, n);
    else
    {
        if (array.length > 0) return array[0];
        else throw "the array is empty, so cannot get the first item in the array!";
    }
}
function myLast(array, n = 0)
{
    if (n > 0) return array.slice(array.length - n);
    else
    {
        if (array.length > 0)
        {
            return array[array.length - 1];
        }
        else throw "the array is empty, so cannot get the last item in the array!";
    }
}

function myFind(collection, predicatecb)
{
    if (Array.isArray(collection))
    {
        for (let n = 0; n < mySize(collection); n++)
        {
            if (predicatecb(collection[n])) return collection[n];
            //else;//do nothing
        }
    }
    else return myFind(myValues(collection), predicatecb);
}
//let myarrval = myFind([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
//console.log("myarrval = " + myarrval);
//let myobjval = myFind({one: 1, three: 3, four: 4, six: 6}, function(num){ return num % 2 == 0; });
//console.log("myobjval = " + myobjval);//call fails for the moment

function myFilter(collection, predicatecb)
{
    if (Array.isArray(collection))
    {
        let myresarr = new Array();
        for (let n = 0; n < mySize(collection); n++)
        {
            if (predicatecb(collection[n])) myresarr.push(collection[n]);
            //else;//do nothing
        }
        return myresarr;
    }
    else return myFilter(myValues(collection), predicatecb);
}
//let myfiltrarrvals = myFilter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
//printOneDArray(myfiltrarrvals, "myfiltrarrvals");
//let myfiltrobjvals = myFilter({one: 1, three: 3, five: 5}, function(num){ return num % 2 == 0; });
//printOneDArray(myfiltrobjvals, "myfiltrobjvals");//call fails for the moment

function myFlatten(array, single, newArr=[])
{
    if (single == undefined || single == null) return myFlatten(array, false, newArr);
    //else;//do nothing

    if (array == undefined || array == null) return null;
    else if (array.length < 1) return array;
    else
    {
        for (let n = 0; n < array.length; n++)
        {
            if (Array.isArray(array[n]))
            {
                if (single)
                {
                    for (let k = 0; k < array[n].length; k++)
                    {
                        newArr.push(array[n][k]);
                    }
                }
                else
                {
                    let mytemparr = myFlatten(array[n], single, []);
                    for (let k = 0; k < mytemparr.length; k++) newArr.push(mytemparr[k]);
                }
            }
            else newArr.push(array[n]);
        }
        return newArr;
    }
}
//let myflatterarrtstn = myFlatten([1, [2, 5], [3, [[4]]]]);
//printOneDArray(myflatterarrtstn, "myflatterarrtstn");
//let mylessflatarr = myFlatten([1, [2, 5], [3, [[4]]]], true);
//printOneDArray(mylessflatarr, "mylessflatarr");

//function mySortBy(array, srtfn)
//{
//    if (array == undefined || array == null) return null;
//    else if (array.length < 2) return array;
//    else
//    {
//        if (srtfn == undefined || srtfn == null)
//        {
//            console.log("default sort will be used!");
//            array.sort();
//            return array;
//        }
//         else
//         {
//             console.log("the given function will be the comparator!");
//             console.log("srtfn = " + srtfn);
//             return array.sort(srtfn);
//         }
//     }
// }
// let mysrtnumarr = mySortBy([1, 2, 3, 4, 5, 6],
//     function(a, b) {
//         if (a < b) return -1;
//         else if (a == b) return 0;
//         else return 1;
//     }
// );
// printOneDArray(mysrtnumarr, "mysrtnumarr");//[5, 4, 6, 3, 1, 2];
// let mysrtedarr = mySortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num) });
// printOneDArray(mysrtedarr, "mysrtedarr");//[5, 4, 6, 3, 1, 2];
// const stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
// let mysrtedobjarr = mySortBy(stooges, function(stooge){ return stooge.name });
// for (let n = 0; n < mysrtedobjarr.length; n++)
// {
//     printOneDArray(myValues(mysrtedobjarr[n]), "myvalsobjinobjarr");
// }
// printOneDArray(mysrtedobjarr, "mysrtedobjarr");
//[{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}];
