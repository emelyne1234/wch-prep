"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from 'axios';

interface AnimalInfo {
  taxonomy?: string[];
  locations?: string[];
  characteristics?: string[];
}

interface AnimalFacts {
  facts: string[];
}

const ExplorePage = () => {
  const [animalName, setAnimalName] = useState("");
  const [animalInfo, setAnimalInfo] = useState<AnimalInfo | null>(null);
  const [facts, setFacts] = useState<AnimalFacts | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAnimalInfo = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.jsongpt.com/json?prompt=Tell me about the ${animalName}&taxonomy=array&locations=array&characteristics=array`
      );
      setAnimalInfo(data);
    } catch (error) {
      console.error("Error fetching animal info:", error);
    }
    setLoading(false);
  };

  const fetchRandomFacts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.jsongpt.com/json?prompt=Generate 5 animal facts&facts=array of animal facts`
      );
      setFacts(data);
    } catch (error) {
      console.error("Error fetching animal facts:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 mt-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">
            Explore Animal Kingdom
          </h1>

          {/* Animal Info Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Search Animal Information</h2>
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                value={animalName}
                onChange={(e) => setAnimalName(e.target.value)}
                placeholder="Enter animal name (e.g., Cheetah)"
                className="flex-1 p-2 border rounded-md"
              />
              <button
                onClick={fetchAnimalInfo}
                disabled={loading || !animalName}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Search
              </button>
            </div>

            {animalInfo && (
              <div className="grid md:grid-cols-3 gap-6">
                {animalInfo.taxonomy && (
                  <div className="border rounded-md p-4">
                    <h3 className="font-semibold mb-2">Taxonomy</h3>
                    <ul className="list-disc list-inside">
                      {animalInfo.taxonomy.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {animalInfo.locations && (
                  <div className="border rounded-md p-4">
                    <h3 className="font-semibold mb-2">Locations</h3>
                    <ul className="list-disc list-inside">
                      {animalInfo.locations.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {animalInfo.characteristics && (
                  <div className="border rounded-md p-4">
                    <h3 className="font-semibold mb-2">Characteristics</h3>
                    <ul className="list-disc list-inside">
                      {animalInfo.characteristics.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Conservation Testimonials Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Voices for Conservation</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="relative">
                  <iframe 
                    className="w-full aspect-video rounded-lg shadow-md"
                    src="https://www.youtube.com/embed/xLtvF0uauRs" 
                    title="Modern Wildlife Conservation in a Turbulent World"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  />
                  <div className="mt-3">
                    <h3 className="font-semibold text-lg">Modern Wildlife Conservation</h3>
                    <p className="text-gray-600">Wesley Larson's perspective on conservation challenges and solutions</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="relative">
                  <iframe 
                    className="w-full aspect-video rounded-lg shadow-md"
                    src="https://www.youtube.com/embed/GLyWIuSQaTk" 
                    title="Wildlife conservation and the art of letting go"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  />
                  <div className="mt-3">
                    <h3 className="font-semibold text-lg">The Art of Conservation</h3>
                    <p className="text-gray-600">Geraldine Morelli shares insights on wildlife preservation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <blockquote className="text-gray-700">
                  "Conservation is a state of harmony between men and land."
                  <footer className="mt-2 text-sm text-gray-600">- Aldo Leopold</footer>
                </blockquote>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <blockquote className="text-gray-700">
                  "What we are doing to the forests of the world is but a mirror reflection of what we are doing to ourselves."
                  <footer className="mt-2 text-sm text-gray-600">- Mahatma Gandhi</footer>
                </blockquote>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <blockquote className="text-gray-700">
                  "The greatest threat to our planet is the belief that someone else will save it."
                  <footer className="mt-2 text-sm text-gray-600">- Robert Swan</footer>
                </blockquote>
              </div>
            </div>
          </div>

          {/* Random Facts Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Random Animal Facts</h2>
              <button
                onClick={fetchRandomFacts}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                Generate Facts
              </button>
            </div>

            {facts && (
              <ul className="space-y-4">
                {facts.facts.map((fact, index) => (
                  <li
                    key={index}
                    className="p-4 bg-gray-50 rounded-md border border-gray-200"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ExplorePage;
