export const ImageValidator = (file) => {
    let accepted = ["jpg", "jpeg", "png"];
    for (let i = 0; i < file.length; i++) {
        let index = file[i].name.lastIndexOf(".");
        let ext = file[i].name.slice(index + 1, file[i].name.length);
        let found = accepted.find(item => {
            return item == ext;
        });
        if (!found) {
            return false;
        }
    }
}
export  const VideoValidator=(file)=>{
    let accepted = ["mp4", "avi", "m4v",'mov','mpg','mpeg'];
    for (let i = 0; i < file.length; i++) {
        let index = file[i].name.lastIndexOf(".");
        let ext = file[i].name.slice(index + 1, file[i].name.length);
        let found = accepted.find(item => {
            return item == ext;
        });
        if (!found) {
            return false;
        }
    }
}
