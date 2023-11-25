import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({link, setLink}) {
    

    async function handleFileChange(ev){
        const files = ev?.target.files;
        if(files?.length ===  1){
            const data = new FormData;
            data.set('file', files[0]);
            data.set('upload_preset', "dfvptgec")
            const uploadPromise = new Promise(async(resolve, reject)=>{
                const imgResp = await fetch('https://api.cloudinary.com/v1_1/dmbmqhtlb/image/upload',{
                    method:'POST',
                    body:data
                })
                if(imgResp.ok)
                {
                    const imageData = await imgResp.text();
                    setLink(JSON.parse(imageData).url)
                    resolve();
                }
                else{
                    reject();
                }
            })

            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Upload complete',
                error:'Upload error',
            })  
        }
    }

  return (
    <>
      {link && (
        <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
      </label>
    </>
  );
}