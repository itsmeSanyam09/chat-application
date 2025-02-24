import {create} from 'zustand';
import toast from 'react-hot-toast';
import {axiosInstance} from '../lib/axios.js';
import { useAuthStore } from './useAuthStore.js';

const BASE_URL = "";

export const useChatStore = create((set,get)=>({
    messages: [],
    users:[],
    selectedUser: null,
    iseUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async() => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get(`${BASE_URL}/messages/users`);
            set({users: res.data});

            
        } catch (error) {
            toast.error(error.response.data.message);
            
        } finally{
            set({iseUsersLoading: false});
        }
    },
    getMessages: async(userId) => {
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`${BASE_URL}/messages/${userId}`);
            set({messages: res.data});
            
        } catch (error) {
            toast.error(error.response.data.message);

            
        } finally{
            set({isMessagesLoading: false});
        }
    },
    sendMessage: async (messageData)=>{
        const {selectedUser,messages} =get();
        try {
            const res = await axiosInstance.post(`${BASE_URL}/messages/sent/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]});
            
        } catch (error) {
            toast.error(error.response.data.message);
            
        }

    },
    subscribeToMessages: ()=>{
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;


        socket.on("newMessage",(newMessage)=>{
            if(!(newMessage.senderId === selectedUser._id)) return;
            set({
                messages:[...get().messages,newMessage]
            });

        })
        console.log("subscribing to new message");

    },
    unsubscribeFromMessages: ()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser)=>set({selectedUser}),


}))
