import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { FaPencilAlt } from 'react-icons/fa';

const ClubContent = ({ content, clubId, onContentUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content.attributes.content);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedContent(content.attributes.content);
    }
    setIsEditing(!isEditing);
  };

  const handleContentChange = (event) => {
    setEditedContent(event.target.value);
  };

  const handleContentSave = async () => {
    if (!editedContent.trim()) {
      alert("Não pode ser vazio");
      return;
    }
    try {
      await axiosInstance.put(`/api/v1/clubs/${clubId}/club_contents/${content.id}`,
      { content: editedContent });
      setIsEditing(false);
      onContentUpdated(editedContent);
    } catch (error) {
      console.error('Error updating content:', error);
      alert("Erro ao atualizar o conteúdo");
    }
  };

  return (
    <section className="bg-white shadow rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">Conteúdo</h2>
        <FaPencilAlt onClick={handleEditToggle} className="cursor-pointer text-gray-600 hover:text-gray-800" />
      </div>
      {isEditing ? (
        <div>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={editedContent}
            onChange={handleContentChange}
          />
          <button onClick={handleContentSave} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
            Save
          </button>
        </div>
      ) : (
        <p className="text-gray-700">{editedContent || 'No content available.'}</p>
      )}
    </section>
  );
};

export default ClubContent;
