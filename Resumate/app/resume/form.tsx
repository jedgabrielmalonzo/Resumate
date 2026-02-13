import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { Colors } from '../../constants/theme';
import { useThemeColor } from '../../hooks/use-theme-color';

const RED = "#c40000";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface WorkExperience {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa: string;
}

interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export default function ResumeFormScreen() {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '', 
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [professionalSummary, setProfessionalSummary] = useState('');
  
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    {
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
    },
  ]);

  const [skills, setSkills] = useState<string[]>(['']);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      title: '',
      issuer: '',
      date: '',
      description: '',
    },
  ]);

  const [hasWorkExperience, setHasWorkExperience] = useState(true);

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateWorkExperience = (index: number, field: keyof WorkExperience, value: string) => {
    const updated = [...workExperience];
    updated[index] = { ...updated[index], [field]: value };
    setWorkExperience(updated);
  };

  const addWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const removeWorkExperience = (index: number) => {
    if (workExperience.length > 1) {
      setWorkExperience(workExperience.filter((_, i) => i !== index));
    }
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        degree: '',
        institution: '',
        location: '',
        graduationDate: '',
        gpa: '',
      },
    ]);
  };

  const removeEducation = (index: number) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    }
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const removeSkill = (index: number) => {
    if (skills.length > 1) {
      setSkills(skills.filter((_, i) => i !== index));
    }
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    const updated = [...achievements];
    updated[index] = { ...updated[index], [field]: value };
    setAchievements(updated);
  };

  const addAchievement = () => {
    setAchievements([
      ...achievements,
      {
        title: '',
        issuer: '',
        date: '',
        description: '',
      },
    ]);
  };

  const removeAchievement = (index: number) => {
    if (achievements.length > 1) {
      setAchievements(achievements.filter((_, i) => i !== index));
    }
  };

  const handleBuildResume = () => {
    // TODO: Implement resume building functionality
    Alert.alert('Build Resume', 'Resume building functionality will be implemented soon!');
  };

  // Custom Input Component
  const InputField = ({ 
    placeholder, 
    value, 
    onChangeText, 
    multiline = false, 
    numberOfLines = 1,
    keyboardType = 'default',
    containerStyle = {},
    ...props 
  }: {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    multiline?: boolean;
    numberOfLines?: number;
    keyboardType?: 'default' | 'email-address' | 'phone-pad';
    containerStyle?: any;
  }) => (
    <View style={[styles.inputContainer, containerStyle]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.textInput,
          { color: textColor },
          multiline && styles.multilineInput
        ]}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );

  // Custom Button Component
  const PrimaryButton = ({ 
    title, 
    onPress, 
    style = {} 
  }: {
    title: string;
    onPress: () => void;
    style?: any;
  }) => (
    <TouchableOpacity 
      style={[styles.primaryButton, style]} 
      onPress={onPress}
    >
      <Text style={styles.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  // Custom Checkbox Component
  const Checkbox = ({ 
    checked, 
    onPress, 
    label 
  }: {
    checked: boolean;
    onPress: () => void;
    label: string;
  }) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkboxText}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <ThemedView style={styles.content}>
            <ThemedText style={styles.title}>Build Your Resume</ThemedText>
            <ThemedText style={styles.subtitle}>
              Fill out your information to create a professional resume
            </ThemedText>

          {/* Personal Information Section */}
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Personal Information</ThemedText>
            
            <View style={styles.row}>
              <InputField
                placeholder="First Name"
                value={personalInfo.firstName}
                onChangeText={(value: string) => updatePersonalInfo('firstName', value)}
                containerStyle={[styles.inputContainer, styles.halfInput]}
              />
              <InputField
                placeholder="Last Name"
                value={personalInfo.lastName}
                onChangeText={(value: string) => updatePersonalInfo('lastName', value)}
                containerStyle={[styles.inputContainer, styles.halfInput]}
              />
            </View>

            <InputField
              placeholder="Email Address"
              value={personalInfo.email}
              onChangeText={(value: string) => updatePersonalInfo('email', value)}
              containerStyle={styles.inputContainer}
              keyboardType="email-address"
            />

            <InputField
              placeholder="Phone Number"
              value={personalInfo.phone}
              onChangeText={(value: string) => updatePersonalInfo('phone', value)}
              containerStyle={styles.inputContainer}
              keyboardType="phone-pad"
            />

            <InputField
              placeholder="Street Address"
              value={personalInfo.address}
              onChangeText={(value: string) => updatePersonalInfo('address', value)}
              containerStyle={styles.inputContainer}
            />

            <View style={styles.row}>
              <InputField
                placeholder="City"
                value={personalInfo.city}
                onChangeText={(value: string) => updatePersonalInfo('city', value)}
                containerStyle={[styles.inputContainer, styles.flexInput]}
              />
              <InputField
                placeholder="State"
                value={personalInfo.state}
                onChangeText={(value: string) => updatePersonalInfo('state', value)}
                containerStyle={[styles.inputContainer, styles.quarterInput]}
              />
              <InputField
                placeholder="ZIP"
                value={personalInfo.zipCode}
                onChangeText={(value: string) => updatePersonalInfo('zipCode', value)}
                containerStyle={[styles.inputContainer, styles.quarterInput]}
              />
            </View>
          </ThemedView>

          {/* Professional Summary Section */}
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Professional Summary</ThemedText>
            <InputField
              placeholder="Write a brief summary of your professional background and career objectives..."
              value={professionalSummary}
              onChangeText={(value: string) => setProfessionalSummary(value)}
              containerStyle={styles.inputContainer}
              multiline
              numberOfLines={4}
            />
          </ThemedView>

          {/* Work Experience Section */}
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Work Experience</ThemedText>
            
            <Checkbox
              checked={hasWorkExperience}
              onPress={() => setHasWorkExperience(!hasWorkExperience)}
              label="I have work experience"
            />

            {hasWorkExperience && (
              <>
                <View style={styles.sectionHeader}>
                  <ThemedText style={styles.subSectionTitle}>Experience Details</ThemedText>
                  <TouchableOpacity onPress={addWorkExperience} style={styles.addButton}>
                    <ThemedText style={styles.addButtonText}>+ Add</ThemedText>
                  </TouchableOpacity>
                </View>

                {workExperience.map((experience, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.itemHeader}>
                      <ThemedText style={styles.itemNumber}>Experience {index + 1}</ThemedText>
                      {workExperience.length > 1 && (
                        <TouchableOpacity
                          onPress={() => removeWorkExperience(index)}
                          style={styles.removeButton}
                        >
                          <ThemedText style={styles.removeButtonText}>Remove</ThemedText>
                        </TouchableOpacity>
                      )}
                    </View>

                    <InputField
                      placeholder="Job Title"
                      value={experience.jobTitle}
                      onChangeText={(value: string) => updateWorkExperience(index, 'jobTitle', value)}
                      containerStyle={styles.inputContainer}
                    />

                    <InputField
                      placeholder="Company Name"
                      value={experience.company}
                      onChangeText={(value: string) => updateWorkExperience(index, 'company', value)}
                      containerStyle={styles.inputContainer}
                    />

                    <InputField
                      placeholder="Location (City, State)"
                      value={experience.location}
                      onChangeText={(value: string) => updateWorkExperience(index, 'location', value)}
                      containerStyle={styles.inputContainer}
                    />

                    <View style={styles.row}>
                      <InputField
                        placeholder="Start Date (MM/YYYY)"
                        value={experience.startDate}
                        onChangeText={(value: string) => updateWorkExperience(index, 'startDate', value)}
                        containerStyle={[styles.inputContainer, styles.halfInput]}
                      />
                      <InputField
                        placeholder="End Date (MM/YYYY)"
                        value={experience.endDate}
                        onChangeText={(value: string) => updateWorkExperience(index, 'endDate', value)}
                        containerStyle={[styles.inputContainer, styles.halfInput]}
                      />
                    </View>

                    <InputField
                      placeholder="Job Description and Achievements..."
                      value={experience.description}
                      onChangeText={(value: string) => updateWorkExperience(index, 'description', value)}
                      containerStyle={styles.inputContainer}
                      multiline
                      numberOfLines={3}
                    />
                  </View>
                ))}
              </>
            )}
          </ThemedView>

          {/* Education Section */}
          <ThemedView style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Education</ThemedText>
              <TouchableOpacity onPress={addEducation} style={styles.addButton}>
                <ThemedText style={styles.addButtonText}>+ Add</ThemedText>
              </TouchableOpacity>
            </View>

            {education.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.itemHeader}>
                  <ThemedText style={styles.itemNumber}>Education {index + 1}</ThemedText>
                  {education.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeEducation(index)}
                      style={styles.removeButton}
                    >
                      <ThemedText style={styles.removeButtonText}>Remove</ThemedText>
                    </TouchableOpacity>
                  )}
                </View>

                <InputField
                  placeholder="Degree (e.g., Bachelor of Science in Computer Science)"
                  value={edu.degree}
                  onChangeText={(value: string) => updateEducation(index, 'degree', value)}
                  containerStyle={styles.inputContainer}
                />

                <InputField
                  placeholder="Institution Name"
                  value={edu.institution}
                  onChangeText={(value: string) => updateEducation(index, 'institution', value)}
                  containerStyle={styles.inputContainer}
                />

                <InputField
                  placeholder="Location (City, State)"
                  value={edu.location}
                  onChangeText={(value: string) => updateEducation(index, 'location', value)}
                  containerStyle={styles.inputContainer}
                />

                <View style={styles.row}>
                  <InputField
                    placeholder="Graduation Date (MM/YYYY)"
                    value={edu.graduationDate}
                    onChangeText={(value: string) => updateEducation(index, 'graduationDate', value)}
                    containerStyle={[styles.inputContainer, styles.halfInput]}
                  />
                  <InputField
                    placeholder="GPA (Optional)"
                    value={edu.gpa}
                    onChangeText={(value: string) => updateEducation(index, 'gpa', value)}
                    containerStyle={[styles.inputContainer, styles.halfInput]}
                  />
                </View>
              </View>
            ))}
          </ThemedView>

          {/* Skills Section */}
          <ThemedView style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Skills</ThemedText>
              <TouchableOpacity onPress={addSkill} style={styles.addButton}>
                <ThemedText style={styles.addButtonText}>+ Add</ThemedText>
              </TouchableOpacity>
            </View>

            {skills.map((skill, index) => (
              <View key={index} style={styles.skillItem}>
                <InputField
                  placeholder={`Skill ${index + 1}`}
                  value={skill}
                  onChangeText={(value: string) => updateSkill(index, value)}
                  containerStyle={[styles.inputContainer, styles.flexInput]}
                />
                {skills.length > 1 && (
                  <TouchableOpacity
                    onPress={() => removeSkill(index)}
                    style={styles.skillRemoveButton}
                  >
                    <ThemedText style={styles.removeButtonText}>×</ThemedText>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ThemedView>

          {/* Achievements Section */}
          <ThemedView style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={[styles.sectionTitle, styles.achievementTitle]}>Achievements & Certifications</ThemedText>
              <TouchableOpacity onPress={addAchievement} style={styles.addButton}>
                <ThemedText style={styles.addButtonText}>+ Add</ThemedText>
              </TouchableOpacity>
            </View>

            {achievements.map((achievement, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.itemHeader}>
                  <ThemedText style={styles.itemNumber}>Achievement {index + 1}</ThemedText>
                  {achievements.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeAchievement(index)}
                      style={styles.removeButton}
                    >
                      <ThemedText style={styles.removeButtonText}>Remove</ThemedText>
                    </TouchableOpacity>
                  )}
                </View>

                <InputField
                  placeholder="Achievement/Certification Title"
                  value={achievement.title}
                  onChangeText={(value: string) => updateAchievement(index, 'title', value)}
                  containerStyle={styles.inputContainer}
                />

                <InputField
                  placeholder="Issuing Organization"
                  value={achievement.issuer}
                  onChangeText={(value: string) => updateAchievement(index, 'issuer', value)}
                  containerStyle={styles.inputContainer}
                />

                <InputField
                  placeholder="Date Earned (MM/YYYY)"
                  value={achievement.date}
                  onChangeText={(value: string) => updateAchievement(index, 'date', value)}
                  containerStyle={styles.inputContainer}
                />

                <InputField
                  placeholder="Description (optional)"
                  value={achievement.description}
                  onChangeText={(value: string) => updateAchievement(index, 'description', value)}
                  containerStyle={styles.inputContainer}
                  multiline
                  numberOfLines={2}
                />
              </View>
            ))}
          </ThemedView>

          {/* Build Resume Button */}
          <ThemedView style={styles.buttonContainer}>
            <PrimaryButton
              title="Build Resume"
              onPress={handleBuildResume}
              style={styles.primaryButton}
            />
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
    color: RED,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 30,
    color: '#555',
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: RED,
  },
  achievementTitle: {
    flex: 1,
    marginRight: 10,
    marginBottom: 0,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#333',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  flexInput: {
    flex: 1,
  },
  quarterInput: {
    flex: 0.3,
  },
  addButton: {
    backgroundColor: RED,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: RED,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  experienceItem: {
    backgroundColor: '#f8f8f8',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: RED,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: RED,
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  skillRemoveButton: {
    backgroundColor: '#ff6b6b',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: RED,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: RED,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: RED,
    borderColor: RED,
  },
  checkboxText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});