// Importing the necessary modules 
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Image
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import styles from "@/styles/history/historyStyles"; 
import CustomAlert from '@/components/alertBox/alertBox';

// Setting the alert interface 
interface alertConfigInterface {
    visible: boolean;
    type: "success" | "error";
    title: string;
    message: string;
    onConfirm?: () => void;
}

// Setting the interface for the history data 
interface HistoryItem {
    id: string;
    date: string;
    plantName: string;
    diagnosis: string;
    status: "healthy" | "issue";
    imageUrl?: string; // Optional if we don't have an image locally
}

// Creating the history screen component 
const History = () => {
    // Setting the alert state 
    const [alertConfig, setAlertConfig] = useState<alertConfigInterface>({
        visible: false,
        type: "error",
        title: "",
        message: "",
    });

    // Setting the active filter state
    const [activeFilter, setActiveFilter] = useState<"All" | "Healthy" | "Issues">("All");

    // Setting mock data for the analysis history 
    const [historyData, setHistoryData] = useState<HistoryItem[]>([
        {
            id: '1',
            date: 'Oct 24, 2023',
            plantName: 'Ficus Elastica',
            diagnosis: 'Healthy, no issues detected.',
            status: 'healthy'
        },
        {
            id: '2',
            date: 'Oct 15, 2023',
            plantName: 'Tomato Plant',
            diagnosis: 'Mild Nitrogen deficiency detected.',
            status: 'issue'
        },
        {
            id: '3',
            date: 'Oct 02, 2023',
            plantName: 'Monstera Deliciosa',
            diagnosis: 'Overwatering symptoms. Check soil drainage.',
            status: 'issue'
        },
        {
            id: '4',
            date: 'Sep 28, 2023',
            plantName: 'Snake Plant',
            diagnosis: 'Healthy and thriving.',
            status: 'healthy'
        }
    ]);

    // Creating a function to trigger/show the alert cleanly 
    const showAlert = (type: "success" | "error", title: string, message: string, onConfirm?: () => void) => {
        setAlertConfig({
            visible: true,
            type,
            title,
            message,
            onConfirm
        });
    };

    // Creating a function to handle deleting a history item
    const handleDeleteRecord = (id: string, plantName: string) => {
        showAlert(
            "error", 
            "Delete Record", 
            `Are you sure you want to delete the analysis for ${plantName}?`, 
            () => {
                // Filter out the deleted item
                setHistoryData(prevData => prevData.filter(item => item.id !== id));
                // Wait briefly, then show success
                setTimeout(() => {
                    showAlert("success", "Deleted", "The record was successfully removed.");
                }, 500);
            }
        );
    };

    // Filtering the data based on the selected tab
    const filteredData = historyData.filter(item => {
        if (activeFilter === "All") return true;
        if (activeFilter === "Healthy") return item.status === "healthy";
        if (activeFilter === "Issues") return item.status === "issue";
        return true;
    });

    // Rendering the component 
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >

                {/* Custom Styled Alert Modal */}
                <CustomAlert
                    visible={alertConfig.visible}
                    type={alertConfig.type}
                    title={alertConfig.title}
                    message={alertConfig.message}
                    onClose={() => {
                        setAlertConfig((prev) => ({ ...prev, visible: false }));
                        if (alertConfig.onConfirm) {
                            alertConfig.onConfirm();
                        }
                    }}
                />

                {/* Adding the touchable without feedback tag */}
                <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1}>
                    {/* Added Scroll View so the content can scroll */}
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Adding the main div */}
                        <View style={styles.mainDiv}>
                            
                            {/* Header Section */}
                            <View style={styles.headerDiv}>
                                <Text style={styles.headerTitle}>Analysis History</Text>
                                <Text style={styles.headerSubtitle}>View your past plant diagnoses</Text>
                            </View>

                            {/* Filter Chips Section */}
                            <View style={styles.filterScroll}>
                                <ScrollView 
                                    horizontal 
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.filterContentContainer}
                                >
                                    {["All", "Healthy", "Issues"].map((filter) => (
                                        <TouchableOpacity
                                            key={filter}
                                            style={[
                                                styles.filterChip,
                                                activeFilter === filter && styles.filterChipActive
                                            ]}
                                            onPress={() => setActiveFilter(filter as any)}
                                        >
                                            <Text 
                                                style={[
                                                    styles.filterChipText,
                                                    activeFilter === filter && styles.filterChipTextActive
                                                ]}
                                            >
                                                {filter}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>

                            {/* History List Section */}
                            <View style={styles.historyListContainer}>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item) => (
                                        <TouchableOpacity 
                                            key={item.id} 
                                            style={styles.historyCard}
                                            activeOpacity={0.7}
                                        >
                                            {/* Image Thumbnail */}
                                            {item.imageUrl ? (
                                                <Image source={{ uri: item.imageUrl }} style={styles.historyImage} />
                                            ) : (
                                                <View style={styles.imagePlaceholder}>
                                                    <Ionicons name="leaf-outline" size={24} color="#4CAF50" />
                                                </View>
                                            )}

                                            {/* Card Content Details */}
                                            <View style={styles.cardContent}>
                                                <View style={styles.dateRow}>
                                                    <Text style={styles.historyDate}>{item.date}</Text>
                                                    
                                                    {/* Status Badge */}
                                                    <View style={[
                                                        styles.statusBadge,
                                                        item.status === 'healthy' ? styles.statusBadgeHealthy : styles.statusBadgeIssue
                                                    ]}>
                                                        <Text style={
                                                            item.status === 'healthy' ? styles.statusTextHealthy : styles.statusTextIssue
                                                        }>
                                                            {item.status === 'healthy' ? 'HEALTHY' : 'ISSUE'}
                                                        </Text>
                                                    </View>
                                                </View>
                                                
                                                <Text style={styles.plantName}>{item.plantName}</Text>
                                                <Text style={styles.diagnosisText} numberOfLines={2}>
                                                    {item.diagnosis}
                                                </Text>
                                            </View>

                                            {/* Delete Button */}
                                            <TouchableOpacity 
                                                style={styles.deleteButton}
                                                onPress={() => handleDeleteRecord(item.id, item.plantName)}
                                            >
                                                <Ionicons name="trash-outline" size={20} color="#E57373" />
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    // Empty State (When no data matches the filter)
                                    <View style={styles.emptyStateContainer}>
                                        <Ionicons name="document-text-outline" size={60} color="#A5D6A7" />
                                        <Text style={styles.emptyStateText}>No Records Found</Text>
                                        <Text style={styles.emptyStateSubtext}>
                                            You haven't made any scans that match this category yet.
                                        </Text>
                                    </View>
                                )}
                            </View>

                        </View>
                    </ScrollView>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

// Exporting the history page 
export default History;