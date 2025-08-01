import emailjs from '@emailjs/browser';

export const sendConfirmationEmail = async (bookingData) => {

    const formatDate = (date) => {
        if (date instanceof Date) {
            return (
                `${date.getDate().toString().padStart(2, '0')}/` +
                `${(date.getMonth() + 1).toString().padStart(2, '0')}/` +
                `${date.getFullYear()}`
            );
        }
        return date;
    };
    const templateParams = {
        user_name: bookingData.fullName,
        email: bookingData.email,
        service: bookingData.service.name,
        date: formatDate(bookingData.date),
        time: bookingData.time || 'N/A',
    };

    try {
        const response = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID, //service IDA
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID, //template ID
            templateParams,
            import.meta.env.VITE_EMAILJS_USER_ID //user Id

        );
        console.log('Email sent successfully:', response);
        return response;
        
    }catch (error){
        console.error('Error al enviar el email:', error)
        throw error;
    }
};