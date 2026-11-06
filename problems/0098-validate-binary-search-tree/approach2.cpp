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
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        bool havePrev = false; // nothing visited yet (a value can be INT_MIN, so no sentinel) // @viz init
        int prev = 0; // the last value visited in order // @viz init
        std::stack<TreeNode*> st; // @viz init
        TreeNode* node = root; // @viz init
        while (!st.empty() || node) { // in-order: left subtree, node, right subtree // @viz loop
            while (node) { // go as far left as possible // @viz left
                st.push(node); // @viz left
                node = node->left; // @viz left
            }
            node = st.top(); // the smallest value not visited yet // @viz visit
            st.pop(); // @viz visit
            if (havePrev && node->val <= prev) // in a BST the in-order values only go up // @viz check
                return false; // @viz bad
            prev = node->val; // @viz visit
            havePrev = true; // @viz visit
            node = node->right; // @viz right
        }
        return true; // @viz return
    }
};
