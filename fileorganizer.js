
// let input = process.argv;
// console.log(input);
// //index 0--its give pathofnode , 1--give path_of_currentfile,2--or more for input
// let inm = input[2];
// console.log(inm);
let fs = require("fs");
let path = require("path");
let folderpath = process.argv[2];

console.log(folderpath);

let extension = {
    vidoes:[".mp4","mkv"],
    Audio :[".mp3"],
    Document:[".doc",".txt",".xlsx",".pdf",],
    Image:[".jpeg",".jpg",".gif"],
    Softwer:[".exe"]
};
let folderexist = fs.existsSync(folderpath);
if(folderexist)
{
    let files = fs.readdirSync(folderpath);
    // console.log(files);
    for(let i=0;i<files.length;i++)
    {
        let extm = path.extname(files[i]);
        let nameoffolder = givenameFolder(extm);
        // console.log("Ext--",extm,"  Folder--",nameoffolder);
        let pathoffolder = path.join(folderpath,nameoffolder);
        let exist = fs.existsSync(pathoffolder);
        if(exist)
        {
            moveFile(folderpath,pathoffolder,files[i]);
        }
        else{
            fs.mkdirSync(pathoffolder);
            moveFile(folderpath,pathoffolder,files[i]);
        }
    }

}
else{
    console.log("please enter the valid path!!!!!!");
}

function givenameFolder(extm)
{
    for(let key in extension)
    {
        let extarr = extension[key];
        for(let i=0;i<extarr.length;i++)
        {
            if(extarr[i] == extm)
            {
                return key;
            }
        }
    }
    return "other"
}

function moveFile(folderpath,pathoffolder,filename)
{
    let source = path.join(folderpath,filename);
    let destination = path.join(pathoffolder,filename);
    fs.copyFileSync(source,destination);
    fs.unlinkSync(source);
}