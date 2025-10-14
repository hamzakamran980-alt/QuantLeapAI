import React, { useState } from 'react';
import Card from './ui/Card';

interface Topic {
    title: string;
    content: string;
}

interface TeacherAssistantProps {
    title: string;
    topics: Topic[];
}

const TeacherAssistant: React.FC<TeacherAssistantProps> = ({ title, topics }) => {
    const [openTopic, setOpenTopic] = useState<number | null>(0);

    const toggleTopic = (index: number) => {
        setOpenTopic(openTopic === index ? null : index);
    };

    return (
        <Card className="sticky top-20">
            <div className="p-4 border-b border-brand-border">
                <h2 className="text-lg font-bold text-brand-gold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {title}
                </h2>
            </div>
            <div className="p-4 space-y-2">
                {topics.map((topic, index) => (
                    <div key={index}>
                        <button
                            onClick={() => toggleTopic(index)}
                            className="w-full text-left flex justify-between items-center py-2 text-md font-semibold text-brand-primary hover:text-brand-blue"
                        >
                            <span>{topic.title}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform text-brand-secondary ${openTopic === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openTopic === index && (
                            <div className="pt-1 pb-3 text-sm text-brand-secondary border-l-2 border-brand-blue pl-3">
                                {topic.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default TeacherAssistant;