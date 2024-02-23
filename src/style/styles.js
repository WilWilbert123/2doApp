import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonContainer: {
        bottom: 20,
        alignSelf: 'center',
    },
    addButton: {
        backgroundColor: 'green',
        borderRadius: 8,
        padding: 10,
        marginTop: 150,
    },
    square: {
        width: 150,
        height: 250,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalInput: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: 200,
    },
    modalInput1: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: 300,
    },

    modalTask: {
        fontSize: 16,
        marginBottom: 5,
    },
    addTaskButton: {
        backgroundColor: 'green',
        borderRadius: 8,
        padding: 10,
        marginLeft: 10,
        height: 50,
    },
    addTaskButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskListItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        width: 300, 
        height: 50,
        borderRadius: 8,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    backButton: {
        position: 'absolute',
        top: 8,
        left: 10,
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    addTaskContainer:{
        flexDirection:"row",
    },
    completedCount:{
        fontSize:20,
    },
    
});
export default styles;