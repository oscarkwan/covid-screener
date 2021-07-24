import React from 'react';
import Collapsible from '@paprika/collapsible';

function CollapsibleFamily({ familyMembers }) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  return (
    <Collapsible isCollapsed={isCollapsed} label="Family members" onClick={() => setIsCollapsed(!isCollapsed)} className="family-card">
      <ul>
        {familyMembers?.map((familyMember => (
          <li>{familyMember}</li>
        )))}
      </ul>
    </Collapsible>
  )
}

export default CollapsibleFamily;
