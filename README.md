Form Difference Widget
======================

Client side widget that show differences between attributes

Typical usage scenario
----------------------

Approving of changes after import updates. Normally the same entities in snippet on left and right side of the screen.

Features and limitations
------------------------

1.  Works only for labels, inputs and dropdowns. No custom widgets or other standard widgets.

2.  Not updated after changing data.

3.  Not aware of Mendix attributes, you will have to point out corresponding fields yourself.

4.  No default css classes included, by default no effect is visible.

5.  Only one class is assigned per difference

Installation
------------

Place the widget on the form. In case of tab, place it on all tab containers.

Configuration
-------------

### Select class

Give a the fields that has to be compared a class. This class is by default “Compare”

Give fields that must be compared a unique class starting with the attribute prefix, by default “attr\_”. For example attr\_customername.

### Apply class

Class that will be applied when fields differ. Add this class to your ccs-files manually!

### Apply to 

Apply css class to either the left colum, right colum or both.

### Apply node

The css class can be applied to the parent of the selected node, node itself, or the form-control. The form-control is the &lt;input&gt;, &lt;label&gt; or &lt;select&gt; itself.

### Tab indicator

Will mark the surrounding tab-container with a red circle if any changes found.

Known bugs
----------
