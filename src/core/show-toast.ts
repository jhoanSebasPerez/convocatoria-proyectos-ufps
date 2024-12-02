export const showToast = (title: string, description: string, toast: any) => {
    toast({
        title: title,
        description: description,
        duration: 5000,
    })
}