class ImageServices{
    /*async getImageByPath(path){
        try { 
            const data = await fetch(`http://localhost:4000/api/photos/${path}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            const bot = await data.blob();

            const url = URL.createObjectURL(bot);

            return url;
        } catch (error) {
            console.log("Error in getMasterPhoto:", error);
        }
    }*/
}

const imageServices = new ImageServices();

export default imageServices ;