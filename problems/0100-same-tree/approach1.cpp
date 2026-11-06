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
#include <string>
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        std::string a, b; // @viz init
        write(p, a); // @viz init
        write(q, b); // @viz init
        return a == b; // same text means same shape and same values // @viz compare
    }
private:
    void write(TreeNode* node, std::string& out) { // the tree as text, with "#" for every missing child // @viz write
        if (!node) { // @viz write
            out += "#,"; // without this, [1,2] and [1,null,2] would both give "1,2" // @viz write
            return; // @viz write
        }
        out += std::to_string(node->val) + ","; // the comma keeps 1,23 apart from 12,3 // @viz write
        write(node->left, out); // @viz write
        write(node->right, out); // @viz write
    }
};
