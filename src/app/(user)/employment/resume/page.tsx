'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, FileText, Plus, Trash2, Download } from 'lucide-react';

type Experience = { id: string; title: string; company: string; dates: string; description: string };
type Education = { id: string; school: string; degree: string; year: string };

export default function ResumeBuilderPage() {
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState({ name: '', phone: '', email: '', address: '' });
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('t90_resume_data');
    if (saved) {
      const data = JSON.parse(saved);
      setPersonalInfo(data.personalInfo || { name: '', phone: '', email: '', address: '' });
      setExperiences(data.experiences || []);
      setEducation(data.education || []);
      setSkills(data.skills || '');
    }
  }, []);

  const saveToLocal = (data: any) => {
    localStorage.setItem('t90_resume_data', JSON.stringify(data));
  };

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInfo = { ...personalInfo, [e.target.name]: e.target.value };
    setPersonalInfo(newInfo);
    saveToLocal({ personalInfo: newInfo, experiences, education, skills });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSkills(e.target.value);
    saveToLocal({ personalInfo, experiences, education, skills: e.target.value });
  };

  const addExperience = () => {
    setExperiences([...experiences, { id: Date.now().toString(), title: '', company: '', dates: '', description: '' }]);
  };

  const updateExperience = (id: string, field: string, value: string) => {
    const newExp = experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp);
    setExperiences(newExp);
    saveToLocal({ personalInfo, experiences: newExp, education, skills });
  };

  const removeExperience = (id: string) => {
    const newExp = experiences.filter(exp => exp.id !== id);
    setExperiences(newExp);
    saveToLocal({ personalInfo, experiences: newExp, education, skills });
  };

  const addEducation = () => {
    setEducation([...education, { id: Date.now().toString(), school: '', degree: '', year: '' }]);
  };

  const updateEducation = (id: string, field: string, value: string) => {
    const newEdu = education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu);
    setEducation(newEdu);
    saveToLocal({ personalInfo, experiences, education: newEdu, skills });
  };

  const removeEducation = (id: string) => {
    const newEdu = education.filter(edu => edu.id !== id);
    setEducation(newEdu);
    saveToLocal({ personalInfo, experiences, education: newEdu, skills });
  };

  const handleDownload = () => {
    const resumeText = `
${personalInfo.name.toUpperCase()}
${personalInfo.address} | ${personalInfo.phone} | ${personalInfo.email}

SKILLS
${skills}

WORK EXPERIENCE
${experiences.map(exp => `${exp.title} - ${exp.company} | ${exp.dates}\n${exp.description}`).join('\n\n')}

EDUCATION
${education.map(edu => `${edu.degree} - ${edu.school} (${edu.year})`).join('\n')}
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white p-4 shadow-sm flex items-center gap-4 sticky top-0 z-10">
        <Link 
          href="/employment"
          className="p-2 -ml-2 rounded-lg hover:bg-slate-100 flex items-center justify-center min-h-[48px] min-w-[48px]"
        >
          <ChevronLeft className="w-6 h-6 text-slate-900" />
        </Link>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          Resume Builder
        </h1>
      </header>

      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Step {step} of 5</span>
          <span>{Math.round((step / 5) * 100)}% Complete</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 transition-all" style={{ width: `${(step / 5) * 100}%` }} />
        </div>
      </div>

      <main className="flex-1 p-4 max-w-2xl mx-auto w-full pb-24">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Personal Info</h2>
            {['name', 'phone', 'email', 'address'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">{field}</label>
                <input
                  name={field}
                  value={(personalInfo as any)[field]}
                  onChange={handlePersonalChange}
                  className="w-full p-3 min-h-[48px] border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder={`Your ${field}`}
                />
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-2xl font-bold text-slate-900">Work Experience</h2>
            {experiences.map((exp, index) => (
              <div key={exp.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-slate-900">Job {index + 1}</h3>
                  <button onClick={() => removeExperience(exp.id)} className="text-red-500 p-2 min-h-[48px] min-w-[48px]">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                {['title', 'company', 'dates'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">{field}</label>
                    <input
                      value={(exp as any)[field]}
                      onChange={(e) => updateExperience(exp.id, field, e.target.value)}
                      className="w-full p-3 min-h-[48px] border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder={`e.g. ${field === 'dates' ? 'Jan 2020 - Present' : ''}`}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description (What did you do?)</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    className="w-full p-3 min-h-[100px] border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            ))}
            <button onClick={addExperience} className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-blue-300 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 min-h-[48px]">
              <Plus className="w-5 h-5" /> Add Job
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-2xl font-bold text-slate-900">Education</h2>
            {education.map((edu, index) => (
              <div key={edu.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-slate-900">School / Program {index + 1}</h3>
                  <button onClick={() => removeEducation(edu.id)} className="text-red-500 p-2 min-h-[48px] min-w-[48px]">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                {['school', 'degree', 'year'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">{field}</label>
                    <input
                      value={(edu as any)[field]}
                      onChange={(e) => updateEducation(edu.id, field, e.target.value)}
                      className="w-full p-3 min-h-[48px] border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                ))}
              </div>
            ))}
            <button onClick={addEducation} className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-blue-300 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 min-h-[48px]">
              <Plus className="w-5 h-5" /> Add Education
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Skills</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">List your skills (comma separated or line by line)</label>
              <textarea
                value={skills}
                onChange={handleSkillsChange}
                className="w-full p-3 min-h-[200px] border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Forklift Operation, Teamwork, Dependability"
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Review Resume</h2>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm font-mono text-sm whitespace-pre-wrap">
              <div className="text-center mb-6 border-b pb-4">
                <div className="text-xl font-bold">{personalInfo.name.toUpperCase()}</div>
                <div>{personalInfo.address} | {personalInfo.phone} | {personalInfo.email}</div>
              </div>
              
              <div className="font-bold text-lg mb-2 border-b">SKILLS</div>
              <div className="mb-6">{skills}</div>

              <div className="font-bold text-lg mb-2 border-b">WORK EXPERIENCE</div>
              <div className="mb-6 space-y-4">
                {experiences.map(exp => (
                  <div key={exp.id}>
                    <div className="font-bold">{exp.title} - {exp.company}</div>
                    <div className="italic text-slate-600">{exp.dates}</div>
                    <div>{exp.description}</div>
                  </div>
                ))}
              </div>

              <div className="font-bold text-lg mb-2 border-b">EDUCATION</div>
              <div className="space-y-2">
                {education.map(edu => (
                  <div key={edu.id}>
                    <span className="font-bold">{edu.degree}</span> - {edu.school} ({edu.year})
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={handleDownload}
              className="w-full bg-blue-600 text-white p-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 min-h-[64px]"
            >
              <Download className="w-6 h-6" />
              Download Resume (Text Format)
            </button>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 flex justify-between gap-4 z-10 max-w-2xl mx-auto w-full">
        <button
          disabled={step === 1}
          onClick={() => setStep(step - 1)}
          className="flex-1 py-3 px-4 rounded-xl font-semibold bg-slate-100 text-slate-700 disabled:opacity-50 min-h-[48px]"
        >
          Back
        </button>
        {step < 5 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex-1 py-3 px-4 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 min-h-[48px]"
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={() => {}}
            className="flex-1 py-3 px-4 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-700 min-h-[48px] opacity-0 pointer-events-none"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
}
