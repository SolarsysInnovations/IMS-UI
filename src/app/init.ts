import { useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useInVoiceContext } from '../context/invoiceContext';
import { useMutation } from '@tanstack/react-query';
import { getUserDetails } from '../api/services/user';

interface CustomeJwtPayload extends JwtPayload {
  id: string;
}

function useInit() {
  const context = useInVoiceContext();
  const [isReady, setIsReady] = useState(false);

  const getUserDetailsMutation = useMutation({
    mutationFn: getUserDetails,
    onSuccess: (response) => {
      context.userDetails.userId = response.id;
      context.userDetails.userName = response.userName;
      context.userDetails.userEmail = response.userEmail;
      context.userDetails.userRole = response.userRole;
      context.userDetails.userMobile = response.userMobile;
      context.companyDetails.companyId = response.companyId;
      setIsReady(true);
    },
    onError: (error) => {
      console.log('initialization is failed', error);
    },
  });

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');

    if (!token) {
      setIsReady(true);
      return;
    }

    const decodedToken = jwtDecode<CustomeJwtPayload>(token);
    const id = decodedToken.id;

    getUserDetailsMutation.mutate(id);
  }, [context]);

  return isReady;
}

export { useInit };
