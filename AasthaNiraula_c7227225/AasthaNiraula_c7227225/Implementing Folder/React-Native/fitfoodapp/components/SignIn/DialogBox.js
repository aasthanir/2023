import React from "react";
import {
	Provider,
	Button,
	Paragraph,
	Dialog,
	Portal,
} from "react-native-paper";

export default function DialogBox({
	visible,
	onDismiss,
	responseMsg,
	onPress,
}) {
	return (
		<Provider>
			<Portal>
				<Dialog visible={visible} onDismiss={onDismiss}>
					<Dialog.Content>
						<Paragraph>{responseMsg}</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Button  onPress={onPress}>OK</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</Provider>
	);
}
