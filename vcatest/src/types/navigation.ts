import type { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
	UserProfile: undefined;
	Login: undefined;
	Home: undefined ;
	Register: undefined;
	// AudioRecorder: undefined
	// AudioRecorder: {}
	// Startup: undefined;
};

export type ApplicationScreenProps =
	StackScreenProps<ApplicationStackParamList>;
