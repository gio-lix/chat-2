export const checkImage = (file: File) => {
    const types = ["image/png", "image/jpeg"]
    let err = ""

    if (!file) return err = "File does not exist."
    if (file.size > 1024 * 1024) return err = "The larger image size is 1mb."
    if (!types.includes(file.type)) return err = "The image format incorrect."
    return err
}
export const imageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "gp2odtf3")
    formData.append("cloud_name", "dlbipxxlr")

    const res = await fetch("https://api.cloudinary.com/v1_1/dlbipxxlr/upload", {
        method: "POST",
        body: formData
    })
    const data = await res.json()

    return {public_id: data.public_id, url: data.secure_url}
}