/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
#include <stack>
#include <vector>
class Solution {
public:
    TreeNode* buildTree(std::vector<int>& preorder, std::vector<int>& inorder) {
        TreeNode* root = new TreeNode(preorder[0]); // @viz init
        std::stack<TreeNode*> st; // the path of nodes still waiting for their right child // @viz init
        st.push(root); // @viz init
        size_t j = 0; // the next value of inorder not yet reached // @viz init
        for (size_t i = 1; i < preorder.size(); ++i) { // @viz loop
            TreeNode* node = new TreeNode(preorder[i]); // @viz loop
            if (st.top()->val != inorder[j]) { // the top's left side isn't finished: this is its left child // @viz left
                st.top()->left = node; // @viz left
            } else { // the top's left side is done: climb up to the last node inorder has reached // @viz climb
                TreeNode* parent = nullptr; // @viz climb
                while (!st.empty() && st.top()->val == inorder[j]) { // @viz climb
                    parent = st.top(); // @viz climb
                    st.pop(); // @viz climb
                    ++j; // @viz climb
                }
                parent->right = node; // this is that node's right child // @viz right
            }
            st.push(node); // @viz push
        }
        return root; // @viz return
    }
};
